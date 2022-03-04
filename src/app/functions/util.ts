
export function generateHexWithBytesLength (code: string, facility: string | null, bytes_length: number) {
    let credential_facility_hex = facility ? Number(facility).toString(16) : ''
    if (credential_facility_hex.length % 2 === 1) credential_facility_hex = `0${credential_facility_hex}`
    let credential_code_hex = Number(code).toString(16)
    if (credential_code_hex.length % 2 === 1) credential_code_hex = `0${credential_code_hex}`

    let key_hex = `${credential_facility_hex}${credential_code_hex}`

    const missing_bytes = (bytes_length * 2 - key_hex.length) / 2
    if (missing_bytes > 0) {
        for (let i = 0; i < missing_bytes; i++) {
            key_hex = `00${key_hex}`
        }
    }

    return key_hex
}

export function getDayOfYear (date: Date) {
    const date_now = new Date(date)
    const date_start = new Date(date_now.getFullYear(), 0, 0)
    const diff = date_now.getTime() - date_start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const day_of_year = Math.floor(diff / oneDay)
    return day_of_year
}
