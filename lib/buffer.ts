// Simple in-memory random buffer

class RandomBuffer {
  private buffer: Buffer = Buffer.alloc(0);
  private consumed = 0;

  append(bytes: Buffer) {
    this.buffer = Buffer.concat([this.buffer, bytes]);
  }

  consume(n: number): Buffer | null {
    const available = this.buffer.length - this.consumed;
    if (available < n) return null;

    const result = this.buffer.slice(this.consumed, this.consumed + n);
    this.consumed += n;
    return result;
  }

  getStats() {
    return {
      totalBytes: this.buffer.length,
      bytesConsumed: this.consumed,
      bytesAvailable: this.buffer.length - this.consumed,
    };
  }
}

export const buffer = new RandomBuffer();
