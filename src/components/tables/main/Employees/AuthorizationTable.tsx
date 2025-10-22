"use client"

import Button from "@/components/ui/button/Button";
import { Table } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import TableHeaderOne from "../../header/TableHeaderOne";
import AuthorizationBody from "../../body/Employees/AuthorizationBody";
import { PermissionService } from "@/services/permissionService";
import { groupPermissions } from "@/utils/format";
import { PermissionType } from "@/schemaValidations/permission.schema";

interface PermissionsUser {
  sales: PermissionType[];
  warehouse: PermissionType[];
}

const title = ["Chức năng", "Nhân viên bán hàng", "Nhân viên kho"];

export default function BasicTables() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [roleState, setRoleState] = useState<PermissionsUser>({
    sales: [],
    warehouse: [],
  });

  const [loading, setLoading] = useState(true);

  // Lấy tất cả permissions
  const fetchDataTable = async () => {
    try {
      setLoading(true);
      const res = await PermissionService.getListPermission();
      setPermissions(groupPermissions(res));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const checkRole = (role: PermissionsUser, permission: keyof PermissionsUser, roleId: string): boolean => {
    const list = role[permission] ?? [];
    return list.some((r) => String(r.id) == String(roleId));
  };
  useEffect(() => {
    fetchDataTable();
    // Lấy permissions theo staff type
    const fetchDataPermission = async () => {
      try {
        setLoading(true);
        const resSales = await PermissionService.getListPermissionByStaffType(1);
        const resWarehouse = await PermissionService.getListPermissionByStaffType(2);

        setRoleState({
          sales: resSales.result || [],
          warehouse: resWarehouse.result || [],
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPermission();
  }, []);

  const handleSave = () => {
    console.log("Sau khi phân quyền: ", JSON.stringify(roleState, null, 2));
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="px-6 py-5">
          <Button size="sm" variant="info" onClick={handleSave}>
            Phân quyền
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table className="w-full">
              <TableHeaderOne title={title} />
              <AuthorizationBody
                tableData={permissions}
                role={roleState}
                onChange={setRoleState}
                checkRole={checkRole}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
