for schema in Site Page MinimalPage
do
    echo -ne  "\rProcessing schema for: $schema";
    npx typescript-json-schema ../types/api_object_types.ts $schema -o schemas/$schema.json --aliasRefs --required; #--noExtraProps
done
echo -e "\rSchemas exported to the schemas folder.";
