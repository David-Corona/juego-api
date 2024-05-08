import { Op, FindOptions } from 'sequelize';


const PAGE_SIZE = 25;
const PAGE = 1;


interface FilterValue {
    value: string;
    matchMode: string;
}

function buildWhereClause(filters: string): any {
    const parsedFilters: { [key: string]: FilterValue } = JSON.parse(filters);
    const whereClause: { [key: string]: any } = {};

    Object.entries(parsedFilters).forEach(([key, value]) => {
        const filterValue = value.value;
        const matchMode = value.matchMode;

        if (filterValue === null) {
            return;
        }

        switch (matchMode) {
            case 'is':
            case 'equals':
                whereClause[key] = { [Op.eq]: filterValue };
                break;
            case 'isNot':
            case 'notEquals':
                whereClause[key] = { [Op.ne]: filterValue };
                break;
            case 'contains':
                whereClause[key] = { [Op.substring]: filterValue };
                break;
            case 'startsWith':
                whereClause[key] = { [Op.startsWith]: filterValue };
                break;
            case 'endsWith':
                whereClause[key] = { [Op.endsWith]: filterValue };
                break;
            // case 'in':
            //     whereClause[key] = { [Op.in]: filterValue.split(',') };
            //     break;
            // case 'before':
            case 'lt':
                whereClause[key] = { [Op.lt]: filterValue };
                break;
            case 'lte':
                whereClause[key] = { [Op.lte]: filterValue };
                break;
            // case 'after':
            case 'gt':
                whereClause[key] = { [Op.gt]: filterValue };
                break;
            case 'gte':
                whereClause[key] = { [Op.gte]: filterValue };
                break;
        }
    });

    return whereClause;
}

export function buildQueryOptions(query: any): FindOptions {
    let { page = PAGE, pageSize = PAGE_SIZE, filters = '{}', sortField = 'createdAt', sortOrder = 'DESC' } = query;

    sortOrder = sortOrder === '1' ? 'ASC' : 'DESC';

    return {
        limit: +pageSize,
        offset: (+page - 1) * +pageSize,
        order: [[sortField, sortOrder]],
        where: buildWhereClause(filters)
    };
}
