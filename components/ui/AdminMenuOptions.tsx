import { Divider, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';

export const AdminMenuOptions = () => {
  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <CategoryOutlined/>
        </ListItemIcon>
        <ListItemText primary={'Productos'} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ConfirmationNumberOutlined/>
        </ListItemIcon>
        <ListItemText primary={'Ordenes'} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AdminPanelSettings/>
        </ListItemIcon>
        <ListItemText primary={'Usuarios'} />
      </ListItem>
    </>
  )
}
