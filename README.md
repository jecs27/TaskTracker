# TaskTracker CLI

**TaskTracker** is a simple and fast command-line tool to manage your personal tasks directly from your terminal. Perfect for developers or CLI lovers who want to stay organized without switching to web or mobile apps.

---

## Installation

Install it globally from your local project folder:

```bash
npm install -g .
```
## Usage
```bash
task-cli <command> [options]
```
#### Examples:
```bash
task-cli add "Buy groceries"
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
task-cli mark-in-progress 2
task-cli mark-done 2
task-cli list
task-cli list done
```

## Available Commands
| Command                 | Description                               |
|-------------------------|-------------------------------------------|
| `add <desc>`            | Add a new task                           |
| `update <id> <desc>`    | Update a task description                |
| `delete <id>`           | Delete a task                            |
| `mark-in-progress <id>` | Mark a task as "in-progress"             |
| `mark-done <id>`        | Mark a task as "done"                    |
| `list [status]`         | List all tasks or filter by status       |

Task statuses: `todo` (default), `in-progress`, `done`


## Task Format

Each task object has the following structure:
```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "in-progress",
  "createdAt": "2025-04-22 14:32:00",
  "updatedAt": "2025-04-22 15:12:04"
}
```

## Example Output
```bash
$ task-cli list

Tasks:
#1 [todo] - Buy groceries
   Created: 2025-04-22 14:32:00
   Updated: 2025-04-22 14:32:00
#2 [done] - Clean the house
   Created: 2025-04-22 13:15:00
   Updated: 2025-04-22 14:50:12
```

## Built With

- Node.js
- Commander.js
- dayjs (with timezone support)
- JSON (as local storage)

## License
MIT License

## Contributing
Pull requests, suggestions, and improvements are welcome!
