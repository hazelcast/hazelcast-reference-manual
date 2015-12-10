#!/bin/bash

function buildDocumentation {
    init $1
    cleanIfExists
    createMergedMarkdownFile
    createSingleHTML
    delete
    echo "Done"
}

function init {
	VERSION=$1
	OUTPUT_DIR="target"
	SINGLE_HTML_OUTPUT_DIR="html-single"
	MANIFEST_FILE_NAME="manifest.json"
	MERGED_FILE_NAME="index.md"
	COPYRIGHT_FILE_NAME="copyright.txt"
	DATE=`date +%b\ %d\,\ %Y`
	YEAR=`date +%Y`
	INDEX=`awk '{gsub(/^[ \t]+|^([#]+.*)|[ \t]+([#]+.*)\$/,""); print;}' documentation.index`
}

function cleanIfExists {
	if [ -e "./$OUTPUT_DIR" ]; then
		echo "Cleaning $OUTPUT_DIR"
		$(rm -rf "./$OUTPUT_DIR")
	fi
	echo "Creating $OUTPUT_DIR"
	mkdir ${OUTPUT_DIR}
	echo "Creating $OUTPUT_DIR/$SINGLE_HTML_OUTPUT_DIR"
	mkdir ${OUTPUT_DIR}/${SINGLE_HTML_OUTPUT_DIR}
}

function writeManifestFile {
    if [[ -e "./$MANIFEST_FILE_NAME" ]]; then
        $(rm -rf "./$MANIFEST_FILE_NAME")
    fi

    writeManifest=$( echo $1 >> ${MANIFEST_FILE_NAME})
    if [[ $? -eq 0 ]]; then
        echo "Manifest file succesfully written."
    else
        echo "Error writing manifest file"
        echo ${writeManifest}
        delete
        exit -1
    fi
}

function createMergedMarkdownFile {
    if [[ -e "./$MERGED_FILE_NAME" ]]; then
	    $(rm -rf "./$MERGED_FILE_NAME")
    fi

    echo "Creating concatenated markdown file for pdf/single html."
    for file in ${INDEX}; do
        cat ${file} >> ${MERGED_FILE_NAME}
        printf "\n\n\n" >> ${MERGED_FILE_NAME}
    done
}

function createSingleHTML {
    MANIFEST_FILE_BODY="{\"title\": \"Documentation\",
\"rootDir\": \".\",
\"date\": \"${DATE}\",
\"version\": \"${VERSION}\",
\"maxTocLevel\":1,
\"files\":[\"./$MERGED_FILE_NAME\"]}"

    writeManifestFile "${MANIFEST_FILE_BODY}"

    echo "Creating single_html documentation"
    createHtml=$(bfdocs --theme=themes/single_html ${MANIFEST_FILE_NAME} "./"${OUTPUT_DIR}/${SINGLE_HTML_OUTPUT_DIR})
    if [[ $? -eq 0 ]]; then
        echo "Single HTML created succesfully "
    else
        echo "Error creating Single HTML documentation"
        delete
        exit -1
    fi
}


function delete {
    echo "Deleting created files"
    $(rm -rf "./$COPYRIGHT_FILE_NAME")
    $(rm -rf "./$MERGED_FILE_NAME")
    $(rm -rf "./$MANIFEST_FILE_NAME")
    $(rm -rf "./title.txt")
    $(rm -rf "./src/images")
}

buildDocumentation $1
