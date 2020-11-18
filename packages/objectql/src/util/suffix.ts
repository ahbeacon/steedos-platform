const customObjectNameSuffix = '__c';
const customFieldNameSuffix = '__c';
declare var Steedos: any;

export const getObjectSuffix = (spaceId: string, internal?: boolean)=>{
    if(internal){
        return customObjectNameSuffix
    }

    if(Steedos.hasFeature('standard_object', spaceId)){
        return '';
    }
    return customObjectNameSuffix;
}

export const hasObjectSuffix = (objectName: string, spaceId: string, internal?: boolean)=>{
    let suffix = getObjectSuffix(spaceId, internal);
    if(!suffix){
        return false;
    }
    return objectName.endsWith(suffix);
}

export const _makeNewObjectName = (objectName: string, spaceId: string, oldObjectName?: string)=>{
    if(!oldObjectName){
        return `${objectName}${getObjectSuffix(spaceId)}`
    }else{
        if(oldObjectName.endsWith(customObjectNameSuffix)){
            return `${objectName}${customObjectNameSuffix}`
        }else{
            return `${objectName}`
        }
    }
}

export const getFieldSuffix = (spaceId: string, internal?: boolean)=>{
    if(internal){
        return customFieldNameSuffix
    }
    if(Steedos.hasFeature('standard_object', spaceId)){
        return '';
    }
    return customFieldNameSuffix;
}

export const hasFieldSuffix = (fieldName: string, spaceId: string, internal?: boolean)=>{
    let suffix = getFieldSuffix(spaceId, internal);
    if(!suffix){
        return false;
    }
    return fieldName.endsWith(suffix);
}

export const _makeNewFieldName = (fieldName: string, spaceId: string, oldFieldName?: string)=>{
    if(!oldFieldName){
        return `${fieldName}${getFieldSuffix(spaceId)}`
    }else{
        if(oldFieldName.endsWith(customFieldNameSuffix)){
            return `${fieldName}${customFieldNameSuffix}`
        }else{
            return `${fieldName}`
        }
    }
}