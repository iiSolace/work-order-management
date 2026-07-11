const baseColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'Overtime',
    dataIndex: 'overtime',
    key: 'overtime',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]

export function createWorkOrderColumns(isAdmin: boolean) {
  if (!isAdmin) {
    return baseColumns
  }

  return [
    ...baseColumns,
    {
      title: 'Action',
      key: 'action',
      width: 100,
    },
  ]
}
