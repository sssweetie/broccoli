interface AuditLogProps {
  userImg?: string;
  auditLogText: string;
  date: string;
}

export const AuditLog: React.FC<AuditLogProps> = ({
  userImg,
  auditLogText,
  date,
}) => {
  return (
    <article className="audit" key={date}>
      <img src={userImg} alt="person" className="audit__img" />
      <span className="audit__text">{auditLogText}</span>
      <span className="audit__date">{date}</span>
    </article>
  );
};
