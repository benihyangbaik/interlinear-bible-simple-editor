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


import React, { useContext, FC } from 'react';

import { LoadedBibleContext } from '@/contexts/LoadedBibleContext';
import { Option } from '../styles';


const defaultBibleBookSelectorText = "Choose bible book";

function createBibleBookSelector(bibleBookNameList: Array<string>) {
  let jsxMarkup = [<Option disabled value="undefined">{defaultBibleBookSelectorText}</Option>];

  for (let i = 0; i < bibleBookNameList.length; i++) {
    jsxMarkup.push(<Option value={bibleBookNameList[i]}>{bibleBookNameList[i]}</Option>)
  }
  return jsxMarkup as Array<JSX.Element>;
}

export const BibleBookSelectorBlock: FC = () => {
  const [state, dispatch] = useContext(LoadedBibleContext);
  console.log(state.bibleInfo.bibleBookName);

  return (
    <select id="bible-book-picker" className="picker-items" name="bible-book-picker"
      value={state.bibleInfo.bibleBookName !== '' ? state.bibleInfo.bibleBookName : "undefined"}
      onChange={(event) => {
        dispatch({ type: 'setBibleBookNameFromBibleInfo', bibleBookName: event.target.value });
      }}
    >
      {createBibleBookSelector(state.bibleBookNames)}
    </select>
  );
}
