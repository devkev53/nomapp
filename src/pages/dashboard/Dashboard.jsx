import { RiDashboardFill } from "react-icons/ri";

export const Dashboard = () => {
  return (
    <div className="dashboard_wrapper p-4 flex flex-col justify-center">

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          <RiDashboardFill />
          Dashboard
        </h2>
        <div className="tite_border"></div>
      </div>
    </div>
  )
}
