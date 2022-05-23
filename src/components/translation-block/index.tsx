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

import TranslationBlockColumnContainer from './ColumnContainer/ColumnContainer';

import { LoadedBibleContext } from '@/contexts/LoadedBibleContext'
import { Container } from './styles';


export function TranslationBlock(): React.ReactElement<Record<string, unknown>> {
  const { loadedBibleObject, updateUploadedBible } = React.useContext(LoadedBibleContext) as LoadedBibleContextType;
  return (
    <Container>
      <TranslationBlockColumnContainer loadedBibleObject={loadedBibleObject} updateUploadedBible={updateUploadedBible}/>
    </Container>
  );
}

export default TranslationBlock;
