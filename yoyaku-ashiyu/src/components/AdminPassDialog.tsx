// 参考
// https://mui.com/material-ui/react-dialog/
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (adminPassword: string) => void;
}

const AdminPassDialog: React.FC<Props> = (props) => {
    const handleOnClose = () => {
        props.onClose();
    }
    const handleOnSubmit = (ap: string) => {
        props.onSubmit(ap);
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleOnClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const adminPassword = formJson.adminPassword;
                    handleOnSubmit(adminPassword as string);
                  },
                }}
            >
                <DialogTitle>admin login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        管理者パスワードを入力してください
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="adminPassword"
                        name="adminPassword"
                        label="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose}>キャンセル</Button>
                    <Button type="submit">管理</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { AdminPassDialog };
