import { CHANGE_DATE_RANGE_FILTER } from '../constants'

let default_date_range = {
    from: null,
    to: null
}

export default (dateRange = default_date_range, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANGE_DATE_RANGE_FILTER:
                return payload.dateRange
    }

    return dateRange
}