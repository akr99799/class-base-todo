import React, { Component } from 'react'
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Grid,
  Button,
  TextField,
  Tooltip,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { AddOutlined, CloseOutlined, DeleteOutline } from '@mui/icons-material'

const styles = (theme) => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.black,
  },
  addBtn: {
    display: 'flex',
    justifyContent: 'center',
  },
  addField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
        { description: 'This is item 1' },
        { description: 'This is item 2' },
        { description: 'This is item 3' },
      ],
      completed: [],
      open: true,
      addInput: '',
    }
  }

  handleFindTodos = (index) => {
    return this.state.completed.some((v) => v === index)
  }

  handleToggle = (index) => {
    if (this.handleFindTodos(index)) {
      return this.setState({
        completed: this.state.completed.filter((v) => v !== index),
      })
    }
    return this.setState({ completed: [...this.state.completed, index] })
  }

  handleDelete = (index) => {
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== index),
    })
  }

  handleAdd = () => {
    this.setState({
      todos: [...this.state.todos, { description: this.state.addInput }],
      open: true,
      addInput: '',
    })
  }

  render = () => {
    const { classes } = this.props
    return (
      <Box className={classes.root}>
        <AppBar position={'fixed'}>
          <Toolbar className={classes.header}>
            <Typography variant={'h3'}>To do list</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <List>
          {this.state.todos.map((todo, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Tooltip title={'Delete'}>
                  <IconButton
                    edge="end"
                    aria-label="delete todo"
                    onClick={() => this.handleDelete(index)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                role={undefined}
                onClick={() => this.handleToggle(index)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={this.handleFindTodos(index)}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{
                    textDecoration: this.handleFindTodos(index)
                      ? 'line-through'
                      : 'none',
                  }}
                  id={index}
                  primary={todo.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {this.state.open ? (
          <Box className={classes.addBtn}>
            <Tooltip title={'Add'}>
              <IconButton onClick={() => this.setState({ open: false })}>
                <AddOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Grid container xs={12} className={classes.addField}>
            <Grid item xs={3} mr={2}>
              <TextField
                aria-label={'Enter Todo'}
                placeholder={'Enter Todo'}
                variant={'outlined'}
                size={'small'}
                fullWidth
                value={this.state.addInput}
                onChange={(event) => {
                  this.setState({ addInput: event.target.value })
                }}
              />
            </Grid>
            <Grid item xs={'auto'}>
              <Button
                type={'submit'}
                variant={'contained'}
                onClick={this.handleAdd}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={'auto'}>
              <Tooltip title={'Close'}>
                <IconButton onClick={() => this.setState({ open: true })}>
                  <CloseOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </Box>
    )
  }
}

export default withStyles(styles)(App)
