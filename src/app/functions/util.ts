
export function generateHexWithBytesLength (hex: string, bytes_length: number) {
    const missing_bytes = (bytes_length * 2 - hex.length) / 2
    if (missing_bytes > 0) {
        for (let i = 0; i < missing_bytes; i++) {
            hex = `00${hex}`
        }
    }
    return hex
}
