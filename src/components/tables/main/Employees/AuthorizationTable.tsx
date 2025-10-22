"use client"

import Button from "@/components/ui/button/Button";
import { Table } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import TableHeaderOne from "../../header/TableHeaderOne";
import AuthorizationBody from "../../body/Employees/AuthorizationBody";
import { PermissionService } from "@/services/permissionService";
import { groupPermissions } from "@/utils/format";
import { PermissionType } from "@/schemaValidations/permission.schema";
import { Loading } from "@/components/common/Loading";

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
      const resSales = await PermissionService.getListPermissionByStaffType(1);
      const resWarehouse = await PermissionService.getListPermissionByStaffType(2);
      setRoleState({
        sales: resSales.result,
        warehouse: resWarehouse.result,
      });
      setPermissions(groupPermissions(res));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  const handleSave = () => {
    console.log("Sau khi phân quyền: ", JSON.stringify(roleState, null, 2));
    // Gọi API lưu phân quyền ở đây
    const payload = {
      staffType: 1, // Ví dụ: nhân viên bán hàng
      permissionIds: roleState.sales.map((p) => p.id),
    }
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
              {loading && (
                <Loading colSpan={title.length} />
              )}
              {!loading && (
                <AuthorizationBody
                  tableData={permissions}
                  role={roleState}
                  onChange={setRoleState}
                />
              )}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
