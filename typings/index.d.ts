
declare module '*.frag' {
    const content: (...arg) => string;
    export default content;
}

declare module '*.vert' {
    const content: (...arg) => string;
    export default content;
}


declare module '*.json' {
    const content: any;
    export default content;
}


declare module '*.handlebars' {
    const content: (...arg) => string;
    export default content;
}
