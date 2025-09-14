import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';
import OuterLayer from './TasksContext.jsx';// 最外层组件，定义task、dispatch，其children组件（相当于插槽）（AddTask、TaskList）可以通过引用TasksContext和TasksDispatchContext获取task、dispatch，不需要层级props传递
export default function TaskApp() {
  return (
    <OuterLayer>
      <h1>reducer-context.jsx</h1>
      <AddTask />
      <TaskList />
    </OuterLayer>
  );
}
