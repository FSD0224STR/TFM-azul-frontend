import { useEffect } from "react";
import { Row, Col, Select, Input } from "antd";

const { Option } = Select;
const { Search } = Input;

const Filters = ({ trips, onFilterChange }) => {
  const uniqueOwners = Array.from(
    new Set(trips.map((trip) => trip.owner.username))
  );

  useEffect(() => {
    onFilterChange({ search: "", owner: "" });
  }, [trips]);

  const handleSearchChange = (value) => {
    onFilterChange((prev) => ({ ...prev, search: value }));
  };

  const handleOwnerChange = (value) => {
    onFilterChange((prev) => ({ ...prev, owner: value }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <Search
          placeholder="Buscar por título"
          onSearch={handleSearchChange}
          enterButton
        />
      </Col>
      <Col xs={24} sm={12}>
        <Select
          placeholder="Filtrar por dueño"
          style={{ width: "100%" }}
          onChange={handleOwnerChange}
        >
          {uniqueOwners.map((owner) => (
            <Option key={owner} value={owner}>
              {owner}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default Filters;
