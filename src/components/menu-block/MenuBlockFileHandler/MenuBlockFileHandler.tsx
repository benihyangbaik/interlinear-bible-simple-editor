/*

Interlinear Bible Simple Editor is a multiplatform interlinear bible translation software.
Copyright (C) 2022  Aranggi J. Toar

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; only version 2 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA. 

*/


import * as React from 'react';
import { DefaultButton } from '@fluentui/react';

import { populateWithEmptyTargetLanguage } from '@/utilities/populateWithEmptyTargetLanguage';
import { arrangeBibleBookName } from '@/utilities/arrangeBibleBookName';

import { PropsAll, PropsLoad, PropsUpdate } from './type';
import { Label } from './style';


const loadFileText = "Load";
const saveFileText = "Save";

const uploadFileText = "Upload";
const downloadFileText = "Download";

const uploadRequestHandler: React.FC<PropsUpdate> = ({updateUploadedBible, children}) => {
  var fileName = '';

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const fileReader = new FileReader();
    // @ts-ignore // the element exists
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    // @ts-ignore // the element exists
    fileName = e.target.files[0].name;

    fileReader.onload = (e2) => {
      // @ts-ignore // the property exists
      const fileObject = Object.assign(JSON.parse(e2.currentTarget.result));
      let bibleBookNames = Object.keys(fileObject);
      let updatedFileObject = fileObject;

      // Check which book exists.
      let bibleBookName: string;
      if (fileObject['Genesis'] !== undefined) {
        bibleBookName = 'Genesis';
      } else if (fileObject['Matthew'] !== undefined) {
        bibleBookName = 'Matthew';
      }

      // If the file is a default Open Scripture's Hebrew Bible format, add the
      // container for target language.
      if (fileObject[bibleBookName][0][0][0].length === 3) {
        updatedFileObject = populateWithEmptyTargetLanguage(fileObject);
      }

      // If there is more than one Bible book, arrange the order;
      if (bibleBookNames.length > 1) {
        bibleBookNames = arrangeBibleBookName(bibleBookNames);
      }

      console.log(updatedFileObject);

      // @ts-ignore // the element exists
      const newUploadedFile: ILoadedBible = {
        ['bibleObject']: updatedFileObject,
        ['chosenBibleSourceName']: fileName,
        ['chosenBibleBookNames']: bibleBookNames,
        ['chosenBibleBookDetails']: [bibleBookName, '0', '0']
      }
      updateUploadedBible(newUploadedFile);

    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <DefaultButton id="menu-load-file" className="menu-items">
          <Label>
            {loadFileText}
            <input type="file" onChange={handleChange} />
          </Label>
          <span id="loaded-file-name">{fileName}</span>
        </DefaultButton>
    </>
  );
}

const downloadRequestHandler: React.FC<PropsLoad> = ({loadedBibleObject, children}) => {
  const stringifiedBibleObject = JSON.stringify(loadedBibleObject.bibleObject);

  // @ts-expect-error // name "Button" exists
  const downloadBibleAsJSON = (e: MouseEventHandler<Button>): void => {
    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(stringifiedBibleObject);
    hiddenElement.target = '_blank';
    hiddenElement.download = loadedBibleObject.chosenBibleSourceName as string;
    hiddenElement.click();
  }
  
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <DefaultButton id="menu-save-file" onClick={downloadBibleAsJSON}>
          {saveFileText}
        </DefaultButton>
    </>
  );
}

const MenuBlockFileHandler: React.FC<PropsAll> = ({loadedBibleObject, updateUploadedBible}) => {
  const Upload = uploadRequestHandler;
  const Download = downloadRequestHandler;
  return (
    <>
      <div className="menu-items">
        <Upload updateUploadedBible={updateUploadedBible}>
          <button type="submit">{uploadFileText}</button>
        </Upload>
      </div>
      <div className="menu-items">
        <Download loadedBibleObject={loadedBibleObject}>
          <button type="submit">{downloadFileText}</button>
        </Download>
      </div>
    </>
  );
}
export default MenuBlockFileHandler;
