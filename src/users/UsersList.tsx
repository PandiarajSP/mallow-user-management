import {
  DeleteFilled,
  EditOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
  TableProps,
} from "antd";

import { Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Search from "../components/search-component/SearchComponent";
import { AppDispatch } from "../store";
import TestErrorButton from "../utils/TestErrorButton";
import { UserModel } from "./user.model";
import userService from "./user.service";
import UsersCreateOrEdit from "./UserCreateOrEdit";
import "./UserList.css";
import ModalComponent from "../components/modal-component/ModalComponent";

const UserList: React.FC = () => {
  const [sourceInfoData, setSourceInfoData] = useState<UserModel[]>([]);
  const [filteredSourceTableData, setFilteredSourceTableData] = useState<
    UserModel[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [spinStatus, setSpinStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditMode, setModalEditMode] = useState(false);
  const [modalUserData, setModalUserData] = useState<UserModel | null>(null);
  const [modalTitle, setModalTitle] = useState("Create User");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState<UserModel | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const openCreateModal = () => {
    setModalUserData(null);
    setModalEditMode(false);
    setModalTitle("Create User");
    setModalVisible(true);
  };
  const openEditModal = (user: UserModel) => {
    setModalUserData(user);
    setModalEditMode(true);
    setModalTitle("Edit User");
    setModalVisible(true);
  };

  const fetchAllUsers = async () => {
    setSpinStatus(true);
    try {
      let allUsers: UserModel[] = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        let payload = {
          page: page,
          per_page: 10,
        };
        const res = await userService.fetchUsers(dispatch, payload);
        if (res && res.data) {
          allUsers = [...allUsers, ...res.data];
          totalPages = res.total_pages;
          page++;
        } else {
          break;
        }
      }

      setSourceInfoData(allUsers);
      setFilteredSourceTableData(allUsers);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setSpinStatus(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSourceTableData.slice(startIndex, startIndex + pageSize);
  }, [filteredSourceTableData, currentPage, pageSize]);

  const handleDelete = (record: UserModel) => {
    setUserToDelete(record);
    setConfirmDeleteModalVisible(true);
  };
  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      setSpinStatus(true);
      await userService.deleteUser(dispatch, userToDelete.id.toString());
      setConfirmDeleteModalVisible(false);
      fetchAllUsers();
      setSpinStatus(true);
    }
  };

  const tableColumns: TableProps<UserModel>["columns"] = [
    {
      dataIndex: "avatar",
      key: "avatar",
      fixed: "left",
      render: (url: string) => (
        <Avatar
          src={url}
          size={48}
          shape="circle"
          style={{ border: "1px solid #eee" }}
        />
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", responsive: ["sm"] },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      responsive: ["sm"],
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      responsive: ["sm"],
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record: UserModel) => (
        <Space size="small">
          <Button
            type="primary"
            style={{
              borderRadius: 0,
              backgroundColor: "#1677ff",
              color: "#fff",
            }}
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Button
            danger
            style={{ borderRadius: 0 }}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onTableSearch = (filteredData: UserModel[]) => {
    setFilteredSourceTableData(filteredData);
    setCurrentPage(1);
  };
  const CardView = () => (
    <Row gutter={[16, 16]}>
      {paginatedUsers.map((user) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={user.id}>
          <div className="user-card">
            <div className="card-center-actions">
              <div
                className="action-btn edit-btn"
                onClick={() => openEditModal(user)}
              >
                <EditOutlined />
              </div>
              <div
                className="action-btn delete-btn"
                onClick={() => handleDelete(user)}
              >
                <DeleteFilled />
              </div>
            </div>

            <Avatar src={user.avatar} size={80} className="user-avatar" />
            <div className="user-info">
              <div className="user-name">
                {user.first_name} {user.last_name}
              </div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <Spin
      spinning={spinStatus}
      indicator={<LoadingOutlined spin />}
      size="large"
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24, marginTop: 10 }}
      >
        <Col>
          <span style={{ fontSize: 25, fontWeight: "bold" }}>Users</span>
        </Col>
        <Col>
          <Row gutter={16} align="middle">
            <Col>
              <Search<UserModel>
                data={sourceInfoData}
                placeholder="Search Users"
                handler={onTableSearch}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ borderRadius: 0 }}
                onClick={openCreateModal}
              >
                Create User
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="list"
        activeKey={viewMode}
        onChange={(key) => setViewMode(key as "list" | "card")}
        tabBarStyle={{ marginBottom: 0 }}
        items={[
          {
            key: "list",
            label: (
              <span>
                <TableOutlined style={{ marginRight: 6 }} />
                Table View
              </span>
            ),
            children: (
              <Table
                dataSource={paginatedUsers}
                columns={tableColumns}
                rowKey="id"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredSourceTableData.length,
                  onChange: (page) => setCurrentPage(page),
                  showSizeChanger: false,
                  placement: ["bottomEnd"],
                }}
                scroll={{ x: "max-content" }}
              />
            ),
          },

          {
            key: "card",
            label: (
              <span>
                <UnorderedListOutlined style={{ marginRight: 6 }} />
                Card View
              </span>
            ),
            children: (
              <>
                <CardView />

                <Row justify="end" style={{ marginTop: 20 }}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredSourceTableData.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </Row>
              </>
            ),
          },
        ]}
      />

      <UsersCreateOrEdit
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchAllUsers();
        }}
        userData={modalUserData}
        editMode={modalEditMode}
        cardTitle={modalTitle}
      />
      <ModalComponent
        title="Delete User"
        message={`Are you sure you want to delete this user?`}
        showCloseButton={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteModalVisible(false)}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        visible={confirmDeleteModalVisible}
      />
    </Spin>
  );
};

export default UserList;
