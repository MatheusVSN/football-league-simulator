/**
 * Generates a unique ObjectId string.
 * @returns {string} The generated ObjectId string.
 */
export function generateObjectId(): string {
    let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};