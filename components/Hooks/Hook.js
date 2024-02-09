import styles from "./Hook.module.css"
import HookModelSelector from "./HookModelSelector";

const Hook = ({ hook }) => {
    return (
      <div className={styles.hook__info__container}>
            <HookModelSelector models={hook.model} hook={hook} />
        <div className={styles.description__container}>
          <h2 className="title">{`Опис гачків ${hook.brand} ${hook.series}:`}</h2>
          <ul className={styles.description__list}>
            {hook.description.map((item, index) => (
              <li key={index}>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Hook;