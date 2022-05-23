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

import TranslationBlockRowContainer from '@/components/translation-block/RowContainer/RowContainer';

import { assembleBibleDataByVerse } from '@/utilities/assembleBibleDataByVerse';
import { arrayOfCorrectlyOrderedNTBibleBookName, arrayOfCorrectlyOrderedOTBibleBookName } from '@/utilities/correctlyOrderedBibleBookName';

import { Container } from './styles';


// Generate the column containers.
// Return an array of JSX Elements.
function columnContainerGenerator(sourceData: ILoadedVerse, count: number) {
  let jsxMarkup = [] as Array<JSX.Element>;

  for (let i = 0; i < count; i++) {
    let columnId = "column-" + i as string;
    // Key attribute is a necessary internal component for React to not output warnings.
    // It is implicitly defined but it's defined explicitly here to be safe.
    // References:
    // https://reactjs.org/docs/lists-and-keys.html#keys
    // https://reactjs.org/docs/reconciliation.html#recursing-on-children
    jsxMarkup.push(
      <div key={i} id={columnId}>
        {<TranslationBlockRowContainer loadedBibleVerse={sourceData}verseIndex={i} />}
      </div>
    );
  }

  return jsxMarkup as Array<JSX.Element>;
}

// Interpret the verse direction.
// Return a string of the direction.
function verseDirection(currentBook: string) {
  if (arrayOfCorrectlyOrderedOTBibleBookName.indexOf(currentBook) > -1) {
    return "rtl";
  } 

  if (arrayOfCorrectlyOrderedNTBibleBookName.indexOf(currentBook) > -1) {
    return "ltr";
  }
}

// Display translation block's column container.
const TranslationBlockColumnContainer: React.FC<Props> = ({loadedBibleObject}) => {
  let verseData = assembleBibleDataByVerse(loadedBibleObject) as ILoadedVerse,
      verseLength = verseData.arrayOfTargetWords.length as number,
      currentBook = loadedBibleObject.chosenBibleBookDetails[0] as string;

  return (
    <Container>
      <div id="column-container" className={verseDirection(currentBook)}>
        {columnContainerGenerator(verseData, verseLength)}
      </div>
    </Container>
  );
}

export default TranslationBlockColumnContainer;
