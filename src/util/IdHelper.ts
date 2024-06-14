export class IdHelper {
    base36Encode(ts: number): string {
        return ts.toString(36);
    }

    generateRandomString(length: number): string {
        const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    generateSortableId(): string {
        const timestamp = Date.now();
        const base36Timestamp = this.base36Encode(timestamp);
        const uniqueId = this.generateRandomString(6);
        return `${base36Timestamp}-${uniqueId}`;
    }
}
