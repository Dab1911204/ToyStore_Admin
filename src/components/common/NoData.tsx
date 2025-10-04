import React from "react";

interface NoDataProps {
  colSpan?: number;
  title: string
}
export const NoData: React.FC<NoDataProps>= ({colSpan,title}) => {
  return (
    <>
        <tbody>
          <tr>
            <td colSpan={colSpan} className="px-4 py-3 text-gray-500 text-center text-theme-lg">
              {title}
            </td>
          </tr>
        </tbody>
    </>
  )
};
