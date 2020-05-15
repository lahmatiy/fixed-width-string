const ANSI_REGEXP = /([\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])/g;

function stripAnsi(str) {
    return str.replace(ANSI_REGEXP, '');
}

module.exports = function fixedWidthString(str, width, options) {
    str = String(str);
    width = parseInt(width, 10) || 0;
    options = options || {};

    const strWoAnsi = stripAnsi(str);

    // return empty string for bad width
    if (width <= 0) {
        return '';
    }

    // do nothing
    if (strWoAnsi.length == width) {
        return str;
    }

    // padding
    if (strWoAnsi.length <= width) {
        const paddingWidth = Math.max(width - strWoAnsi.length, 0);
        const paddingString = options.padding ? fixedWidthString(options.padding, 1, { ellipsis: '' }) : ' ';
        const padding = paddingString.repeat(paddingWidth);

        return options.align == 'right'
            ? padding + str
            : str + padding;
    }

    // truncating

    // try to be intuitive
    // if align to right and truncate doesn't specify – truncate from left
    if (options.align == 'right' && 'truncate' in options == false) {
        options.truncate = 'left';
    }

    const parts = str.split(ANSI_REGEXP);
    const ellipsis = typeof options.ellipsis === 'string'
        ? options.ellipsis
        : ('ellipsis' in options === false || options.ellipsis ? '\u2026' : '');  // '\u2026' === '…'
    const ellipsisWoAnsi = stripAnsi(ellipsis);
    let result = '';

    if (ellipsisWoAnsi.length >= width) {
        return fixedWidthString(ellipsis, width, { ellipsis: '' });
    }

    width -= ellipsis.length;

    if (options.truncate == 'left') {
        // trancate left
        // 'very long str' -> '…str'
        for (let i = parts.length - 1, len = 0; i >= 0; i--) {
            const part = parts[i];

            // process non-ansi parts only
            if (i % 2 == 0) {
                if (len + part.length >= width) {
                    result =
                        // ignore all other plain strings left
                        parts.slice(0, i).filter((str, idx) => idx % 2 ? str : '').join('') +
                        ellipsis + part.substr(part.length - (width - len)) +
                        result;

                    break;
                }

                len += part.length;
            }

            result = part + result;
        }
    } else {
        // trancate right
        // 'very long str' -> 'ver…'
        for (let i = 0, len = 0; i < parts.length; i++) {
            const part = parts[i];

            // process non-ansi parts only
            if (i % 2 == 0) {
                if (len + part.length >= width) {
                    result =
                        result +
                        part.substr(0, width - len) + ellipsis +
                        // ignore all other plain strings
                        parts.slice(i).filter((str, idx) => idx % 2 ? str : '').join('');

                    break;
                }

                len += part.length;
            }

            result += part;
        }
    }

    return result;
};
