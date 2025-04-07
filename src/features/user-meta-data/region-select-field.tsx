// import React, { useEffect, useState } from 'react';
// import SelectBox from './select-box';
// import { mainRegion } from '../user-meta-data/data/user-meta-data';
// import type { UserMetaDataType } from '@/types/user-meta-data-type';
// import { onSelectType } from './user-meta-data';

// type Props = {
//   mainRegionValue: UserMetaDataType['mainRegion'];
//   subRegionValue: UserMetaDataType['subRegion'];
//   onSelect: onSelectType;
//   error: string;
// };
// const RegionSelectField = ({ mainRegionValue, subRegionValue, onSelect, error }: Props) => {
//   const [subRegionOptions, setSubRegionOptions] = useState([]);
//   const fetchSubRegions = async () => {
//     const res = await fetch(`/api/regions/${mainRegionValue}`);
//     const data = await res.json();
//     setSubRegionOptions(data);
//   };
//   useEffect(() => {
//     if (mainRegionValue !== 'default') {
//       fetchSubRegions();
//     }
//   }, [mainRegionValue]);

//   return (
//     <div className='h-14'>
//       <label>*지역</label>
//       <SelectBox
//         options={mainRegion}
//         selected={mainRegionValue}
//         onSelect={(selected) => onSelect('mainRegion', selected)}
//       />
//       {mainRegionValue !== 'default' && (
//         <SelectBox
//           options={subRegionOptions || []}
//           selected={subRegionValue}
//           onSelect={(selected) => onSelect('subRegion', selected)}
//         />
//       )}
//       <p className='h-3 text-red-500'>{error}</p>
//     </div>
//   );
// };

// export default React.memo(RegionSelectField);

//@TODO: 사람인 API 연결 시 되살릴 예정
