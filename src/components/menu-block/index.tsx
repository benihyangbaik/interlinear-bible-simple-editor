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


import React from 'react';
import styled from 'styled-components';

import MenuBlockFileHandler from './MenuBlockFileHandler/MenuBlockFileHandler';
import { MenuBlockSettings } from './Settings/Settings';

import { LoadedBibleContext } from '@/contexts/LoadedBibleContext';

import './index.css';

const Block = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  width: 100%;
`;

export function MenuBlock(): React.ReactElement<Record<string, unknown>> {
  const { loadedBibleObject, updateUploadedBible } = React.useContext(LoadedBibleContext) as LoadedBibleContextType
  return (
    <Block>
      <MenuBlockFileHandler loadedBibleObject={loadedBibleObject} updateUploadedBible={updateUploadedBible}/>
    </Block>
  );
}

export default MenuBlock;
