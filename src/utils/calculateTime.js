export function calculateTime(createTime) {
    const createAt = new Date(createTime).getTime()
    const now = new Date().getTime()
    const diffInMs = now - createAt
    const hoursAgo = Math.floor(diffInMs / (1000 * 60 * 60))
    const minutesAgo = Math.floor((diffInMs / (1000 * 60) % 60))


    return { hoursAgo, minutesAgo }
}

