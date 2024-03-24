// Math.random()
// Math.floor()
// Math.round()

/**
 * private static char[] _base62chars =
 *         "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 *         .ToCharArray();
 *
 *     private static Random _random = new Random();
 *
 *     public static string GetBase62(int length)
 *     {
 *         var sb = new StringBuilder(length);
 *
 *         for (int i=0; i<length; i++)
 *             sb.Append(_base62chars[_random.Next(62)]);
 *
 *         return sb.ToString();
 *     }
 */
class IdGenerator {
    //IOgy08
    generate(length: number): string {
        return ''
    }
}

const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function makeShort(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}
