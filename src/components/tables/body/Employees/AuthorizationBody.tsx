"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";
import Switch from "@/components/form/switch/Switch";

interface Role {
  id: string;
  name: string;
  value?: boolean;
}

interface NewsTableRow {
  id: string | number;
  name: string;
  role: Role[];
  // Add other fields if needed
}

interface NewsTableBodyProps {
  tableData: NewsTableRow[];
  role:permissionsUser;
  onChange:(data:permissionsUser) => void;
}

interface permissionsUser{
  manager:string[],
  salesperson:string[],
  warehouse_staff:string[],
  accounting:string[]
}

const AuthorizationBody: React.FC<NewsTableBodyProps> = ({
  tableData,
  role,
  onChange
}) => {
  const checkRole = (permission:"manager"|"salesperson"|"warehouse_staff"|"accounting" ,roleid:string)=>{
    if(role[permission]?.includes(roleid)){
      return true
    }
    return false
  }
  const handleSwitch = (permission:"manager"|"salesperson"|"warehouse_staff"|"accounting",roleid:string,value:boolean) => {
    if(value){
      role[permission]?.push(roleid)
    }
    onChange(role)
  }
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((order) => (
          <>
            <TableRow key={order.id} className="bg-gray-50 dark:bg-white/[0.03]">
              <TableCell colSpan={5} className="px-4 py-3 text-gray-500 text-center text-base font-semibold dark:text-gray-400 ">
                {order.name}
              </TableCell>
            </TableRow>
            {order.role.map((role) => (
              <>
                <TableRow key={role.id} id={role.id}>
                  <TableCell  className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {role.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Switch
                      name="manager"
                      checked={checkRole("manager",role.id)}
                      onChange={(value) => handleSwitch("manager",role.id,value)}
                      onLabel="Có quyền"
                      offLabel="Không có"
                      size="lg"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Switch
                      name="salesperson"
                      checked={checkRole("salesperson",role.id)}
                      onChange={(value) => handleSwitch("salesperson",role.id,value)}
                      onLabel="Có quyền"
                      offLabel="Không có"
                      size="lg"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Switch
                      name="warehouse_staff"
                      checked={checkRole("warehouse_staff",role.id)}
                      onChange={(value)=>handleSwitch("warehouse_staff",role.id,value)}
                      onLabel="Có quyền"
                      offLabel="Không có"
                      size="lg"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Switch
                      name="accounting"
                      checked={checkRole("accounting",role.id)}
                      onChange={(value)=>handleSwitch("accounting",role.id,value)}
                      onLabel="Có quyền"
                      offLabel="Không có"
                      size="lg"
                    />
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        ))}
        
      </TableBody>
    </>
  );
}

export default AuthorizationBody;