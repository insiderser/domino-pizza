const parser = new DOMParser()

/**
 * @return {Element}
 */
export function parseElementFromString(s) {
    return parser.parseFromString(s, "text/html").body.children[0]
}
