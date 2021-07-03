getSchema () {
    echo -ne  "\rProcessing schema for: $2";
    npx typescript-json-schema $1 $2 -o schemas/$2.json --aliasRefs --required; #--noExtraProps
}

getSchema ../types/api_object_types.ts Site
getSchema ../types/api_object_types.ts Page
getSchema ../types/api_object_types.ts MinimalPage

getSchema ../types/news.ts NewsPageMinimal

echo -e "\rSchemas exported to the schemas folder.";
