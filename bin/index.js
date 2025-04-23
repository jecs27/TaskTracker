#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'tasks.json');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Mazatlan');

function loadTasks() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  return JSON.parse(fs.readFileSync(filePath));
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function getNextId(tasks) {
  const ids = tasks.map(t => t.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

function now() {
  return dayjs().tz('America/Mazatlan').format('YYYY-MM-DD HH:mm:ss');
}

program
  .command('add <description>')
  .description('Add a new task')
  .action((description) => {
    const tasks = loadTasks();
    const newTask = {
      id: getNextId(tasks),
      description,
      status: 'todo',
      createdAt: now(),
      updatedAt: now()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  });

program
  .command('update <id> <description>')
  .description('Update an existing task')
  .action((id, description) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return console.log(`Task with ID ${id} not found.`);
    task.description = description;
    task.updatedAt = now();
    saveTasks(tasks);
    console.log(`Task updated successfully (ID: ${id})`);
  });

program
  .command('delete <id>')
  .description('Delete a task')
  .action((id) => {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) return console.log(`Task with ID ${id} not found.`);
    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);
  });

program
  .command('mark-in-progress <id>')
  .description('Mark a task as in-progress')
  .action((id) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return console.log(`Task with ID ${id} not found.`);
    task.status = 'in-progress';
    task.updatedAt = now();
    saveTasks(tasks);
    console.log(`Task marked as in-progress (ID: ${id})`);
  });

program
  .command('mark-done <id>')
  .description('Mark a task as done')
  .action((id) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return console.log(`Task with ID ${id} not found.`);
    task.status = 'done';
    task.updatedAt = now();
    saveTasks(tasks);
    console.log(`Task marked as done (ID: ${id})`);
  });

program
  .command('list [status]')
  .description('List all tasks or filter by status')
  .action((status) => {
    const tasks = loadTasks();
    const filtered = status ? tasks.filter(t => t.status === status) : tasks;

    if (filtered.length === 0) {
      return console.log(status ? `No tasks with status: ${status}` : 'No tasks found.');
    }

    console.log('\nTasks:');
    filtered.forEach(t => {
      console.log(`#${t.id} [${t.status}] - ${t.description}`);
      console.log(`   Created: ${t.createdAt}`);
      console.log(`   Updated: ${t.updatedAt}`);
    });
    console.log();
  });

program.parse(process.argv);
