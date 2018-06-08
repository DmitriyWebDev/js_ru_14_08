import {Map} from 'immutable'

export function arrToMap(arr, RecordModel = Map) {
    return arr.reduce((acc, item) => acc.set(item.id, new RecordModel(item)), new Map({}))
}

export function mapToArr(obj) {
    return Object.values(obj)
}

export function getTranslatedText( text, dictionary, lang = 'ru' ) {

    if( lang === 'en' ) return text

    if( typeof dictionary[`${text}`][`${lang}`] === 'undefined' ) {
        return text
    } else {
        return dictionary[`${text}`][`${lang}`]
    }

}