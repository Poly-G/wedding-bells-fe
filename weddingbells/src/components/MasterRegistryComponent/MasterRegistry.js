import React, { useEffect, useState } from "react";
import axios from "axios";

import { RegistryData } from "../RegistryList/mappedOver";

import deleteMe from "../../assets/delete.svg";

import OmniModal from "../RegistryModal/registryModal";

import REGISTRY_DATA from "../RegistryList/data";

import "./MasterRegistry.scss";

export default function RegistryComponent() {
	const weddingData = JSON.parse(localStorage.getItem("wedding"));

	//Use React hooks to set state
	// const [registryInfo, setRegistryInfo] = useState([{ registryInfo: {} }]);
	const [registryInfo, setRegistryInfo] = useState([]);
	const [wedding, updateWedding] = useState(weddingData.id);

	const envVarRoute = process.env.REACT_APP_BACKEND_BASE_URL;
	/* Starting from this line and down, whenever the registryInfo loads or is updated the component will re-render */

	const fetchRegistryInfo = async () => {
		const response = await axios.get(
			`${envVarRoute}/api/weddings/${wedding}/registries`
		);
		setRegistryInfo(response.data);
	};

	useEffect(() => {
		fetchRegistryInfo(registryInfo);
	}, []);

	/* Ending at this line, whenever the registryInfo loads or is updated the component will re-render */

	return (
		<div className="masterRegistryComponent">
			<div className="registryList">
				<div className="tableGroup">
					<OmniModal
						className="addRegistry"
						buttonLabel="Add Registry"
						modalTitle="Add Registry"
					/>
					<div className="registry-group">
						{registryInfo.map((registry, idx) => (
							<RegistryData
								key={idx}
								deleteMe={deleteMe}
								{...registry}
								reginfo={registry}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
