import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from "@material-ui/core/transitions";
import Draggable from "react-draggable";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Methane Chart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
        TransitionComponent={Transition}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Global Average Methane Levels
        </DialogTitle>
        <DialogContent>
          {/* Chart goes here? */}
          <DialogContentText>
            Methane, also known as Natural Gas, is an organic compound consisting of one carbon atom and four hydrogen atoms - CH<small className="subscript">4</small>
            The greenhouse effect of methane is several times stronger than that of carbon dioxide<small className="citation">1</small>.  Sources of methane are both
            natural and human-made.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
