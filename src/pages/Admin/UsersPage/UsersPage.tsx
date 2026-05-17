import React, { useState, useEffect } from "react"
import "./UsersPage.css"

interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: string
    createdAt: string
    updatedAt: string
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        role: "",
    })

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/admin/users", {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error("Failed to fetch users")

            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error("Error fetching users:", error)
            alert("Ошибка загрузки пользователей")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUser) return

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/admin/update-user/${selectedUser.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to update user")
            }

            alert("Пользователь успешно обновлен")
            setShowEditModal(false)
            fetchUsers()
        } catch (error) {
            console.error("Error updating user:", error)
            alert(error instanceof Error ? error.message : "Ошибка обновления пользователя")
        }
    }

    const handleDeleteUser = async (userId: number, userName: string) => {
        if (!window.confirm(`Вы уверены, что хотите удалить пользователя ${userName}?`)) {
            return
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/admin/delete-user/${userId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to delete user")
            }

            alert("Пользователь успешно удален")
            fetchUsers()
        } catch (error) {
            console.error("Error deleting user:", error)
            alert(error instanceof Error ? error.message : "Ошибка удаления пользователя")
        }
    }

    const openEditModal = (user: User) => {
        setSelectedUser(user)
        setFormData({
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            phone_number: user.phoneNumber || "",
            role: user.role,
        })
        setShowEditModal(true)
    }

    const getRoleName = (role: string) => {
        switch (role) {
            case "admin":
                return "Администратор"
            case "manager":
                return "Менеджер"
            case "maid":
                return "Горничная"
            case "guest":
                return "Гость"
            default:
                return role
        }
    }

    if (loading) {
        return <div className="users-page__loading">Загрузка...</div>
    }

    return (
        <div className="users-page">
            <div className="users-page__header">
                <button onClick={fetchUsers} className="users-page__refresh-btn">
                    Обновить
                </button>
            </div>

            {/* Десктопная таблица */}
            <div className="users-page__desktop-view">
                <table className="users-page__table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Роль</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <strong>
                                        {user.firstName} {user.lastName}
                                    </strong>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber || "-"}</td>
                                <td>{getRoleName(user.role)}</td>
                                <td>
                                    <div className="users-page__actions">
                                        <button onClick={() => openEditModal(user)} className="users-page__edit-btn">
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)
                                            }
                                            className="users-page__delete-btn"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Мобильная карточная версия */}
            <div className="users-page__mobile-view">
                {users.map((user) => (
                    <div key={user.id} className="users-page__card">
                        <div className="users-page__card-header">
                            <span className="users-page__card-id">ID: {user.id}</span>
                            <span className="users-page__card-role">{getRoleName(user.role)}</span>
                        </div>
                        <div className="users-page__card-body">
                            <div className="users-page__card-name">
                                <strong>
                                    {user.firstName} {user.lastName}
                                </strong>
                            </div>
                            <div className="users-page__card-email">{user.email}</div>
                            <div className="users-page__card-phone">Тел: {user.phoneNumber || "-"}</div>
                        </div>
                        <div className="users-page__card-actions">
                            <button onClick={() => openEditModal(user)} className="users-page__edit-btn">
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                                className="users-page__delete-btn"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {showEditModal && (
                <div className="users-page__modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="users-page__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="users-page__modal-header">
                            <h2>Редактировать пользователя</h2>
                            <button className="users-page__modal-close" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleUpdateUser} className="users-page__form">
                            <div className="users-page__form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="users-page__form-group">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="users-page__form-group">
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="users-page__form-group">
                                <label>Телефон</label>
                                <input
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                />
                            </div>
                            <div className="users-page__form-group">
                                <label>Роль</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="guest">Гость</option>
                                    <option value="maid">Горничная</option>
                                    <option value="manager">Менеджер</option>
                                    <option value="admin">Администратор</option>
                                </select>
                            </div>
                            <div className="users-page__modal-buttons">
                                <button type="submit" className="users-page__save-btn">
                                    Сохранить
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="users-page__cancel-btn"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersPage
