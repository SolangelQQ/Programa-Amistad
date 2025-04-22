// // src/presentation/components/common/checkbox.tsx

// import React from 'react';

// export const Checkbox = ({ checked, onChange, label }: any) => {
//   return (
//     <label className="flex items-center space-x-2">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//       />
//       <span>{label}</span>
//     </label>
//   );
// };


// src/presentation/components/common/checkbox.tsx

import { Switch } from '@headlessui/react';

export const Checkbox = ({ checked, onChange, label }: any) => {
  return (
    <label className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span
          className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
        />
      </Switch>
      <span>{label}</span>
    </label>
  );
};
