"use client"
import React from "react";
import { TableBody, TableCell, TableRow } from "../../../ui/table";
import Switch from "@/components/form/switch/Switch";
import { PermissionListType, PermissionType } from "@/schemaValidations/permission.schema";

interface PermissionsUser {
  sales: PermissionType[];
  warehouse: PermissionType[];
}

interface AuthorizationBodyProps {
  tableData: PermissionListType[];
  role: PermissionsUser;
  onChange: (data: PermissionsUser) => void;
}

const AuthorizationBody: React.FC<AuthorizationBodyProps> = ({ tableData, role, onChange }) => {
  // Kiểm tra roleItem có trong role không
  const checkRole = (permission: keyof PermissionsUser, roleId: string): boolean => {
    const list = role[permission] ?? [];
    return list.some((r) => String(r.id) === String(roleId));
  };

  // Toggle quyền
  const handleSwitch = (permission: keyof PermissionsUser, roleItem: PermissionType, value: boolean) => {
    const updatedRole: PermissionsUser = {
      ...role,
      [permission]: [...(role[permission] ?? [])],
    };

    const index = updatedRole[permission].findIndex((p) => String(p.id) === String(roleItem.id));

    if (value && index === -1) {
      updatedRole[permission].push(roleItem);
    } else if (!value && index !== -1) {
      updatedRole[permission].splice(index, 1);
    }
    onChange(updatedRole);
    console.log("role đã chọn: " + JSON.stringify(updatedRole.sales, null, 2));
  };

  return (
    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
      {tableData.map((group) => (
        <React.Fragment key={group.id}>
          <TableRow className="bg-gray-50 dark:bg-white/[0.03]">
            <TableCell colSpan={5} className="px-4 py-3 text-center text-base font-semibold dark:text-gray-400">
              {group.name}
            </TableCell>
          </TableRow>

          {group.role.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">{r.name}</TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <Switch
                  name="sales"
                  checked={checkRole("sales", r.id)}
                  onChange={() => { }}
                  onLabel="Có quyền"
                  offLabel="Không có"
                  size="lg"
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                <Switch
                  name="warehouse"
                  checked={checkRole("warehouse", r.id)}
                  onChange={(value) => handleSwitch("warehouse", r, value)}
                  onLabel="Có quyền"
                  offLabel="Không có"
                  size="lg"
                />
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default AuthorizationBody;
