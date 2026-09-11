/**
 * Minimal MP3 helpers: strip ID3v2 tags and compute duration by walking frames.
 * Azure returns raw CBR frames, so this is exact enough for a player label.
 */

const BITRATES = {
  // [version][index] in kbps, Layer III only.
  1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
};
const SAMPLE_RATES = {
  1: [44100, 48000, 32000],
  2: [22050, 24000, 16000],
  2.5: [11025, 12000, 8000],
};

export function stripId3(buffer) {
  if (buffer.length >= 10 && buffer.toString("latin1", 0, 3) === "ID3") {
    const size =
      ((buffer[6] & 0x7f) << 21) | ((buffer[7] & 0x7f) << 14) | ((buffer[8] & 0x7f) << 7) | (buffer[9] & 0x7f);
    return buffer.subarray(10 + size);
  }
  return buffer;
}

function parseHeader(buffer, offset) {
  if (offset + 4 > buffer.length) return null;
  const b1 = buffer[offset];
  const b2 = buffer[offset + 1];
  const b3 = buffer[offset + 2];
  if (b1 !== 0xff || (b2 & 0xe0) !== 0xe0) return null;
  const versionBits = (b2 >> 3) & 0x03;
  const layerBits = (b2 >> 1) & 0x03;
  if (versionBits === 1 || layerBits !== 1) return null; // reserved version or not Layer III
  const version = versionBits === 3 ? 1 : versionBits === 2 ? 2 : 2.5;
  const bitrateIndex = (b3 >> 4) & 0x0f;
  const sampleRateIndex = (b3 >> 2) & 0x03;
  if (bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) return null;
  const bitrate = BITRATES[version === 1 ? 1 : 2][bitrateIndex] * 1000;
  const sampleRate = SAMPLE_RATES[version][sampleRateIndex];
  const padding = (b3 >> 1) & 0x01;
  const samples = version === 1 ? 1152 : 576;
  const frameLength = Math.floor((samples / 8) * bitrate / sampleRate) + padding;
  return { frameLength, samples, sampleRate };
}

/** @returns {number} duration in seconds */
export function mp3Duration(input) {
  const buffer = stripId3(input);
  let offset = 0;
  let seconds = 0;
  while (offset < buffer.length) {
    const frame = parseHeader(buffer, offset);
    if (!frame || frame.frameLength <= 0) {
      offset++; // resync
      continue;
    }
    seconds += frame.samples / frame.sampleRate;
    offset += frame.frameLength;
  }
  return seconds;
}

/** Concatenate chunk buffers into one stream, dropping any ID3 headers. */
export function concatMp3(buffers) {
  return Buffer.concat(buffers.map(stripId3));
}
