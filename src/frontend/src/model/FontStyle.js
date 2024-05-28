
export class FontStyle {
    constructor(color, fontSize, fontFamily, fontWeight, fontStyle, type = []) {
        this.color = color;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.textDecoration = this.getTextDecoration(type);
    }

    getTextDecoration(type) {
        // 밑줄 취소선 겹칠 경우 밑줄만 적용
        if (type.includes('underline') && type.includes('line-through')) {
            return 'underline';
        } else if (type.includes('underline')) {
            return 'underline';
        } else if (type.includes('line-through')) {
            return 'line-through';
        } else {
            return 'none'; // 기본값 설정
        }
    }
}