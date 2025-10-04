import React from "react";

interface LoadingProps {
  colSpan?: number;
}
export const Loading: React.FC<LoadingProps>= ({colSpan}) => {
  return (
    <>
        <tbody>
            <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-center text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </>
  )
};
