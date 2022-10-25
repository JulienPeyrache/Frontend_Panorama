import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { ReactElement, useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WorkIcon from "@mui/icons-material/Work";
import ChairIcon from "@mui/icons-material/Chair";
import { steps, needs, baseURL } from "../assets/Const";
import axios from "axios";

export function Catalog(): ReactElement {
	const [openNeeds, setOpenNeeds] = useState<boolean[]>(
		Array(needs.length).fill(false)
	);
	const [openSteps, setOpenSteps] = useState<boolean[]>(
		Array(
			steps[1].length + steps[2].length + steps[3].length + steps[4].length
		).fill(false)
	);
	const [itemsSteps, setItemsSteps] = useState<any[][]>(
		Array(
			steps[1].length + steps[2].length + steps[3].length + steps[4].length
		).fill(Array())
	);
	const [equipmentsSteps, setEquipmentsSteps] = useState<any[][]>(
		Array(
			steps[1].length + steps[2].length + steps[3].length + steps[4].length
		).fill(Array())
	);
	const [redirectionsSteps, setRedirectionsSteps] = useState<any[][]>(
		Array(
			steps[1].length + steps[2].length + steps[3].length + steps[4].length
		).fill(Array())
	);

	const handleNeedClick = (i: number) => {
		setOpenNeeds(
			openNeeds.map((value, index) => (index === i ? !value : value))
		);
	};

	const handleStepClick = (iNeed: number, jStep: number) => {
		const idx = stepIndex(iNeed, jStep);
		setOpenSteps(
			openSteps.map((value, index) => (index === idx ? !value : value))
		);
		axios
			.get(baseURL + "/api/item/findByStep/" + steps[iNeed + 1][jStep])
			.then((response) =>
				setItemsSteps(
					itemsSteps.map((value, index) =>
						index === idx ? response.data : value
					)
				)
			);
		axios
			.get(baseURL + "/api/equipment/findByStep/" + steps[iNeed + 1][jStep])
			.then((response) =>
				setEquipmentsSteps(
					equipmentsSteps.map((value, index) =>
						index === idx ? response.data : value
					)
				)
			);
		axios
			.get(baseURL + "/api/redirection/findByStep/" + steps[iNeed + 1][jStep])
			.then((response) =>
				setRedirectionsSteps(
					redirectionsSteps.map((value, index) =>
						index === idx ? response.data : value
					)
				)
			);
	};

	const stepIndex = (iNeed: number, jStep: number) => {
		let index = 0;
		for (let i = 0; i < iNeed; i++) {
			index += steps[i + 1].length;
		}
		index += jStep;
		return index;
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<List
				sx={{
					width: "100%",
					bgcolor: "background.paper",
				}}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Catalogue
					</ListSubheader>
				}
			>
				{needs.map((need, i) => (
					<div key={"div-" + need}>
						<ListItemButton key={need} onClick={() => handleNeedClick(i)}>
							<ListItemIcon key={"icon-" + need}>
								{need === "Restauration" && <RestaurantIcon color="primary" />}
								{need === "Commodités" && <ChairIcon color="primary" />}
								{need === "Outils de travail" && <WorkIcon color="primary" />}
								{need === "Support & sécurité" && <BuildIcon color="primary" />}
							</ListItemIcon>
							<ListItemText key={"text-" + need} primary={need} />
							{openNeeds[i] ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse
							key={"collapse-" + need}
							in={openNeeds[i]}
							timeout="auto"
							unmountOnExit
						>
							<List key={"list-" + need} component="div" disablePadding>
								{steps[i + 1].map((step, j) => (
									<div key={"div-" + step}>
										<ListItemButton
											key={step}
											sx={{ pl: 4, pr: 4 }}
											onClick={() => handleStepClick(i, j)}
										>
											<ListItemText key={"text-" + step} primary={step} />
											{openSteps[stepIndex(i, j)] ? (
												<ExpandLess />
											) : (
												<ExpandMore />
											)}
										</ListItemButton>
										<Collapse
											key={"collapse-" + step}
											in={openSteps[stepIndex(i, j)]}
											timeout="auto"
											unmountOnExit
										>
											<List key={"list-" + step} component="div" disablePadding>
												{redirectionsSteps[stepIndex(i, j)].map(
													(redirection) => (
														<ListItemButton key={redirection.id} sx={{ pl: 6 }}>
															<ListItemText
																key={"text-" + redirection.id}
																primary={redirection.label}
															/>
														</ListItemButton>
													)
												)}
												{equipmentsSteps[stepIndex(i, j)].map((equipment) => (
													<ListItemButton
														key={equipment.label_equipment}
														sx={{ pl: 6 }}
													>
														<ListItemText
															key={"text-" + equipment.label_equipment}
															primary={equipment.label_equipment}
														/>
													</ListItemButton>
												))}
												{itemsSteps[stepIndex(i, j)].map((item) => (
													<ListItemButton key={item.label_item} sx={{ pl: 6 }}>
														<ListItemText
															key={"text-" + item.label_item}
															primary={
																item.label_userfriendly
																	? item.label_userfriendly
																	: item.label_item
															}
														/>
													</ListItemButton>
												))}
											</List>
										</Collapse>
									</div>
								))}
							</List>
						</Collapse>
					</div>
				))}
			</List>
		</div>
	);
}
