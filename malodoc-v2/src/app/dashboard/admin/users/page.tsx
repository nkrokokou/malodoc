"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MoreHorizontal, Shield, UserCheck, UserX } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockUsers = [
    { id: 1, name: "Kodjo Mensah", email: "kodjo@example.com", role: "Patient", status: "Active", date: "2024-01-15" },
    { id: 2, name: "Dr. Amina", email: "amina@hospital.tg", role: "Doctor", status: "Verified", date: "2023-11-20" },
    { id: 3, name: "Pharmacie de la Grace", email: "contact@pharma-grace.tg", role: "Pharmacy", status: "Active", date: "2024-02-01" },
    { id: 4, name: "Jean Dupont", email: "jean@example.com", role: "Patient", status: "Inactive", date: "2024-01-10" },
    { id: 5, name: "Admin User", email: "admin@malodoc.com", role: "Admin", status: "Active", date: "2023-01-01" },
]

export default function UserManagementPage() {
    const { t } = useLanguage()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("admin.users")}</h2>
                    <p className="text-muted-foreground">Manage user access and roles.</p>
                </div>
                <Button>
                    <Shield className="w-4 h-4 mr-2" /> Add New Admin
                </Button>
            </div>

            <div className="glass-card p-4 flex items-center gap-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    className="border-none bg-transparent focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">{t("profile.name")}</TableHead>
                            <TableHead>{t("profile.role")}</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div>{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={
                                        user.role === 'Admin' ? 'border-red-500 text-red-500' :
                                            user.role === 'Doctor' ? 'border-blue-500 text-blue-500' :
                                                'border-zinc-500 text-zinc-500'
                                    }>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' || user.status === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                        }`}>
                                        {user.status}
                                    </div>
                                </TableCell>
                                <TableCell>{user.date}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" /> Verify User</DropdownMenuItem>
                                            <DropdownMenuItem><UserX className="mr-2 h-4 w-4" /> Suspend Account</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500">Delete User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </div>
    )
}
