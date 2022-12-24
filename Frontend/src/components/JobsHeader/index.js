// This component is used to render the jobs header.
import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const JobsHeader = (props) => {
  const onChangeActiveOptionId = (event) => {
    const { changeOptionId } = props;
    changeOptionId(event.target.value);
  };

  const { sortByOptions, activeOptionId } = props;
  const filterIcon = <FontAwesomeIcon icon={faSort} />;
  return (
    <div className="jobs-header">
      <h1 className="jobs-heading">Jobs</h1>
      <div className="sort-by-container">
        <p className="sort-by-heading">Sort by</p>
        {filterIcon}
        {
          //rendering the sort options.
        }
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeActiveOptionId}
        >
          {sortByOptions.map((eachObject) => {
            const { optionId, displayText } = eachObject;
            return (
              <option key={optionId} value={optionId} className="select-option">
                {displayText}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default JobsHeader;
