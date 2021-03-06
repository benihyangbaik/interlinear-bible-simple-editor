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

import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 75%;
  justify-content: center;
  padding: 0.75em 1em;
`;

export const Select = styled.select`
  cursor: pointer;
  font-size: 16px;
  margin: 0.5em 1.5em;
  padding: 0.15em 0.3em;
`;

export const Separator = styled.hr`
  border: .75px solid #bbb;
  box-shadow: 20px 20px 200px 3px;
  margin: 1em 0;
  width: 30%;
  transition: all 400ms;
`;

export const Option = styled.option``;
