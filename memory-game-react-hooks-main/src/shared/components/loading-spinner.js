import './loading-spinner.module.css';

const LoadingSpinner = ({loading}) => (
  loading && 
    <div className={'loadingSpinner'}>
      <i className="fa fa-spinner fa-spin" /> Loading...
    </div>
  );

  export default LoadingSpinner;