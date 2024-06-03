export class Text {
    constructor(id, value, fontStyle) {
        this.id = id;
        this.value = value;
        this.fontStyle = fontStyle;
    }

    updateFontStyle(styleName, value, onRefresh) {
        let newStyleValue = value;

        if (this.fontStyle[styleName] === value) {
            newStyleValue = "";  // 현재 값과 동일하면 빈 문자열로 설정
        }

        this.fontStyle = {
            ...this.fontStyle,
            [styleName]: newStyleValue
        };

        onRefresh();
    }
}
